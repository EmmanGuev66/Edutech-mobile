import { Button, ScrollView, Text, View } from 'react-native';
import { useHome } from '../hooks/useHome';

const HomeScreen = () => {
    const { stats, activities, navigateTo } = useHome();

    return (
        <View style={{ flex: 1, padding: 20 }}>
            {/* Header Mockup */}
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Text>[ LOGO EDU TECH ]</Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>EduTech Connect</Text>
                <Text>School Management System</Text>
            </View>

            {/* Tarjetas de Estadísticas (Fila) */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
                <View style={{ borderWidth: 1, padding: 10, alignItems: 'center', flex: 1, margin: 2 }}>
                    <Text>{stats.students}</Text>
                    <Text>Students</Text>
                </View>
                <View style={{ borderWidth: 1, padding: 10, alignItems: 'center', flex: 1, margin: 2 }}>
                    <Text>{stats.professors}</Text>
                    <Text>Professors</Text>
                </View>
                <View style={{ borderWidth: 1, padding: 10, alignItems: 'center', flex: 1, margin: 2 }}>
                    <Text>{stats.subjects}</Text>
                    <Text>Subjects</Text>
                </View>
            </View>

            {/* Actividades Recientes */}
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Recent Activities</Text>
            <ScrollView>
                {activities.map(act => (
                    <View key={act.id} style={{ padding: 15, backgroundColor: '#eee', marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>{act.title}</Text>
                        <Text style={{ fontSize: 12 }}>{act.detail}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Navbar Inferior Mockup */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, paddingTop: 10 }}>
                <Button title="Home" onPress={() => console.log('Home')} />
                <Button title="Student" onPress={() => navigateTo('/register')} />
                <Button title="Professor" onPress={() => console.log('Prof')} />
            </View>
        </View>
    );
};

export default HomeScreen;