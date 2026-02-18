import 'package:flutter/material.dart';

class AppTheme {
  static const electricBlue = Color(0xFF007BFF);
  static const cyan = Color(0xFF00E5FF);
  static const yellow = Color(0xFFFFD400);
  static const orange = Color(0xFFFF8A00);

  static ThemeData get theme => ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: Colors.black,
        colorScheme: const ColorScheme.dark(
          primary: electricBlue,
          secondary: yellow,
          surface: Color(0xFF121212),
        ),
        cardTheme: CardTheme(
          color: Colors.white.withOpacity(0.06),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
        ),
      );
}
