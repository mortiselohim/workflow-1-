import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../screens/screens.dart';

final appRouter = GoRouter(routes: [
  GoRoute(path: '/', builder: (_, __) => const OnboardingScreen()),
  GoRoute(path: '/role', builder: (_, __) => const RoleSelectScreen()),
  GoRoute(path: '/login', builder: (_, __) => const OtpLoginScreen()),
  GoRoute(path: '/passenger/home', builder: (_, __) => const PassengerHomeScreen()),
  GoRoute(path: '/rider/home', builder: (_, __) => const RiderHomeScreen()),
  GoRoute(path: '/support', builder: (_, __) => const SupportTicketsScreen()),
  GoRoute(path: '/tombola', builder: (_, __) => const TombolaProgressScreen()),
]);

class GradientScaffold extends StatelessWidget {
  final String title;
  const GradientScaffold({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(colors: [Color(0xFF007BFF), Color(0xFF00E5FF), Colors.black], begin: Alignment.topLeft, end: Alignment.bottomRight),
        ),
        child: Center(child: Text(title, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold))),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: const Color(0xFFFF3B30),
        child: const Icon(Icons.sos),
      ),
    );
  }
}
