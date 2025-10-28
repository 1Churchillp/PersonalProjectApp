import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
      <SQLiteProvider
        databaseName="propBuddy.db"
        onInit={async (db) => {
            await db.execAsync(`
              DROP TABLE IF EXISTS categories;

              CREATE TABLE IF NOT EXISTS categories (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT NOT NULL,
                  create_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                  comments TEXT NOT NULL
              );

              INSERT INTO categories VALUES (1, 'School', '2025-10-17', 'All school related items');
              INSERT INTO categories VALUES (2, 'Groceries', '2025-10-18', 'Anything I need from the store');
              INSERT INTO categories VALUES (3, 'Home', '2025-10-19', 'Things related to the home');
              INSERT INTO categories VALUES (4, 'Friends', '2025-10-20', 'Activities planned with friends');

              select * from categories;

              DROP TABLE IF EXISTS projects;
              CREATE TABLE IF NOT EXISTS projects (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                  start_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                due_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                cat_id INTEGER,
                  comments TEXT NOT NULL,
                  status TEXT NOT NULL,
                FOREIGN KEY (cat_id) REFERENCES categories(id)
              );

              INSERT INTO projects VALUES (1, "Chap 2.7 1-17 ODD", '2025-10-22', '2025-10-25', 1, 'Math 238', 'open' );
              INSERT INTO projects VALUES (2, "Presentation", '2025-10-22', '2025-10-29', 1, 'Capstone', 'open' );
              INSERT INTO projects VALUES (3, "Flour", '2025-10-22', '2025-10-29', 2, 'Safeway', 'open' );
              INSERT INTO projects VALUES (4, "Gatorade", '2025-10-22', '2025-10-30', 2, 'Safeway', 'open' );
              INSERT INTO projects VALUES (5, "Sugar", '2025-10-22', '2025-10-29', 2, 'Safeway', 'open' );
              INSERT INTO projects VALUES (6, "Pumpkin", '2025-10-22', '2025-10-31', 2, 'Safeway', 'open' );
              INSERT INTO projects VALUES (7, "Fix Gutter", '2025-10-22', '2025-11-30', 3, "It's raining alot", 'open' );

              select * from projects where cat_id = 3;

              DROP TABLE IF EXISTS milestones;
              CREATE TABLE IF NOT EXISTS milestones (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                  start_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                due_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                proj_id INTEGER,
                  comments TEXT NOT NULL,
                  status TEXT NOT NULL,
                FOREIGN KEY (proj_id) REFERENCES projects(id)
              );

              INSERT INTO milestones VALUES (1, "Measure gutter", '2025-10-22', '2025-11-30', 7, "It's raining alot", 'open' );
              INSERT INTO milestones VALUES (2, "Select gutter design", '2025-10-22', '2025-11-30', 7, "It's raining alot", 'open' );
              INSERT INTO milestones VALUES (3, "Create list of materials needed", '2025-10-22', '2025-11-30', 7, "It's raining alot", 'open' );
              INSERT INTO milestones VALUES (4, "Purchase materials", '2025-10-22', '2025-11-30', 7, "It's raining alot", 'open' );
              INSERT INTO milestones VALUES (5, "Remove old gutter", '2025-10-22', '2025-11-30', 7, "It's raining alot", 'open' );
              INSERT INTO milestones VALUES (6, "Install new gutter", '2025-10-22', '2025-11-30', 7, "It's raining alot", 'open' );

              select * from milestones where proj_id = 7;

            PRAGMA journal_mode=WAL;
            PRAGMA foreign_keys = ON; 
            `);
        }}
        options={{useNewConnection: false}}
        >
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </SQLiteProvider>
  );
}
