import 'package:flutter/material.dart';
import 'core/navigation/app_router.dart';
import 'core/theme/app_theme.dart';

void main() => runApp(const MotoxApp());

class MotoxApp extends StatelessWidget {
  const MotoxApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'MOTOX',
      theme: AppTheme.theme,
      routerConfig: appRouter,
    );
  }
}
