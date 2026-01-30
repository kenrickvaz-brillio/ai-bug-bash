
import { OTHER_STORIES, DEFAULT_STORY } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';
import styles from './Dashboard.module.css';

export function StoriesList() {
    const { currentStory, setCurrentStory } = useApp();

    const allStories = [DEFAULT_STORY, ...OTHER_STORIES];
    const queuedStories = allStories.filter(s => s.id !== currentStory.id);

    return (
        <div className={styles.storiesSection}>
            <h3>Active Stories</h3>
            <div className={styles.storiesGrid}>
                {/* Active Story Card */}
                <div className={`${styles.storyCard} ${styles.activeStory} glass`}>
                    <div className={styles.storyStatus}>IN PROGRESS</div>
                    <h4>{currentStory.title}</h4>
                    <p>{currentStory.description}</p>
                </div>

                {/* Queued Story Cards */}
                {queuedStories.map(story => (
                    <div
                        key={story.id}
                        className={`${styles.storyCard} glass`}
                        onClick={() => setCurrentStory(story)}
                        role="button"
                        tabIndex={0}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className={styles.storyStatusQueue}>QUEUED</div>
                        <h4>{story.title}</h4>
                        <p>{story.description.substring(0, 60)}...</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
