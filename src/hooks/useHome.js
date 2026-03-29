import { useRouter } from "expo-router";

export const useHome = () => {
    const router = useRouter();

    // Datos estáticos para el mockup
    const stats = {
        students: 120,
        professors: 35,
        subjects: 20
    };

    const activities = [
        { id: 1, title: 'New student registered', detail: 'cabreba.dayana@utr.com' },
        { id: 2, title: 'New subject created', detail: 'Object-Oriented Programming' }
    ];

    const navigateTo = (route) => {
        router.push(route);
    };

    return {
        stats,
        activities,
        navigateTo
    };
};