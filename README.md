// Eksempel Kotlin kode som bruker Caffeine cache med Micrometer for overvåking

import com.github.benmanes.caffeine.cache.Caffeine
import io.micrometer.core.instrument.MeterRegistry
import io.micrometer.core.instrument.binder.cache.CaffeineCacheMetrics

fun createCacheWithMetrics(meterRegistry: MeterRegistry) {
    val cache = Caffeine.newBuilder()
        .maximumSize(100)
        .build<String, String>()

    CaffeineCacheMetrics.monitor(meterRegistry, cache, "myCache")

    // Bruk cache som vanlig
    cache.put("key", "value")
    val value = cache.getIfPresent("key")
    println("Cache value: $value")
}

// Annet kode for å initialisere MeterRegistry og kalle createCacheWithMetrics kan legges til her
