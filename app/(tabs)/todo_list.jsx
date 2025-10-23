import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const todo_list = () => {
    return (
        <ParallaxScrollView>
            <ThemedView>
                <ThemedText>
                    you made it to todolist
                </ThemedText>
            </ThemedView>

        </ParallaxScrollView>
    )
}