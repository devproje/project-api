package net.projecttl.services

import net.projecttl.model.PasswordOpt
import kotlin.random.Random

private const val UPPER_CASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
private const val LOWER_CASE = "abcdefghijklmnopqrstuvwxyz"
private const val NUMBER_CASE = "0123456789"
private const val SPECIAL_CASE = "~`!@#$%^&*()-_=+[{}]\\|;:'\",.<>/?"

class PasswordService {
    private fun genByte(charset: String): Char {
        val index = Random.nextInt(0, charset.length)
        return charset[index]
    }

    fun generate(opt: PasswordOpt, length: Int = 12): String {
        val builder = StringBuilder()
        var charset = ""
        if (opt.uppercase)
            charset += UPPER_CASE

        if (opt.lowercase)
            charset += LOWER_CASE

        if (opt.number)
            charset += NUMBER_CASE

        if (opt.special)
            charset += SPECIAL_CASE

        for (i in 0 until length)
            builder.append(genByte(charset))

        return builder.toString()
    }
}
