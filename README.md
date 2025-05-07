import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.lang.management.ManagementFactory
import java.util.concurrent.TimeUnit
import com.github.benmanes.caffeine.cache.Caffeine
import com.github.benmanes.caffeine.cache.Cache

@SpringBootApplication
class MonitoringApplication

fun main(args: Array<String>) {
    runApplication<MonitoringApplication>(*args)
}

@RestController
class MonitoringController {

    private val memoryMXBean = ManagementFactory.getMemoryMXBean()

    // Simple cache with stats
    private val cache: Cache<String, String> = Caffeine.newBuilder()
        .maximumSize(1000)
        .expireAfterWrite(10, TimeUnit.MINUTES)
        .recordStats()
        .build()

    init {
        cache.put("key1", "value1")
        cache.put("key2", "value2")
    }

    @GetMapping("/metrics/memory")
    fun getMemoryMetrics(): Map<String, Any> {
        val heapUsage = memoryMXBean.heapMemoryUsage
        return mapOf(
            "heapUsedMB" to heapUsage.used / 1024 / 1024,
            "heapMaxMB" to heapUsage.max / 1024 / 1024,
            "heapCommittedMB" to heapUsage.committed / 1024 / 1024
        )
    }

    @GetMapping("/metrics/cache")
    fun getCacheMetrics(): Map<String, Any> {
        val stats = cache.stats()
        return mapOf(
            "hitCount" to stats.hitCount(),
            "missCount" to stats.missCount(),
            "hitRate" to stats.hitRate(),
            "evictionCount" to stats.evictionCount()
        )
    }

    // Example endpoint to interact with cache
    @GetMapping("/cache/get")
    fun getFromCache(key: String): String? {
        return cache.getIfPresent(key) ?: "Cache miss"
    }

    @GetMapping("/cache/put")
    fun putToCache(key: String, value: String): String {
        cache.put(key, value)
        return "Added $key -> $value"
    }
}
