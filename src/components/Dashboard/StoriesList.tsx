
import { OTHER_STORIES } from '@/lib/mockData';
import styles from './Dashboard.module.css';

export function StoriesList() {
    return (
        <div className={styles.storiesSection}>
            <h3>Active Stories</h3>
            <div className={styles.storiesGrid}>
                <div className={`${styles.storyCard} ${styles.activeStory} glass`}>
                    <div className={styles.storyStatus}>IN PROGRESS</div>
                    <h4>Map–List Synchronization with Draw-to-Search</h4>
                    <p>Seamless spatial search experience across devices.</p>
                </div>
                {OTHER_STORIES.map(story => (
                    <div key={story.id} className={`${styles.storyCard} glass`}>
                        <div className={styles.storyStatusQueue}>QUEUED</div>
                        <h4>{story.title}</h4>
                        <p>{story.description.substring(0, 60)}...</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
