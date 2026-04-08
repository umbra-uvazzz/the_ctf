import java.io.File

data class Result(
    val round: Int,
    val status: String,
    val time: String,
    val cleared: String
)

fun main() {
    val results = listOf(
        Result(1, "PASSED", "12", "-"),
        Result(2, "FAILED", "-", "1")
    )

    val file = File("results.csv")

    file.printWriter().use { out ->
        out.println("Round,Status,Time,Questions Cleared")
        results.forEach {
            out.println("${it.round},${it.status},${it.time},${it.cleared}")
        }
    }

    println("CSV Generated!")
}
