import React from 'react';
import {useUserProfile} from '../../hooks/useUserProfile';

const ProfilePage: React.FC = () => {
    const {data: user, isLoading, error} = useUserProfile();

    if (isLoading) {
        return <p>Loading profile...</p>;
    }

    if (error) {
        return <p>Error loading profile: {error.message}</p>;
    }

    return (
        <div className="profile-page">
            <h2>My Profile</h2>
            {user && (
                <div>
                    <p>
                        <strong>Username:</strong> {user.username}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
