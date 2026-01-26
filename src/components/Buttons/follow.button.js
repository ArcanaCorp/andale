import { Icon } from "@/helpers/icons";
import { useEffect, useState } from "react";
import { followEntity, getFollowersCount, isFollowingEntity, unfollowEntity } from "../../services/follow.service";
export default function FollowButton ({entity, setFollowersCount}) {

    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleFollow = async () => {
        if (isFollowing) {
            await unfollowEntity(entity);
            setIsFollowing(false);
            setFollowersCount(prev => prev - 1);
        } else {
            await followEntity(entity);
            setIsFollowing(true);
            setFollowersCount(prev => prev + 1);
        }
    };

    useEffect(() => {
        async function loadFollowData() {
            setLoading(true);

            const [following, count] = await Promise.all([
                isFollowingEntity(entity),
                getFollowersCount(entity)
            ]);

            setIsFollowing(following);
            setFollowersCount(count);
            setLoading(false);
        }

        loadFollowData();
    }, [entity.id]);

    return (

        <button className="w-full h bg-primary text-white rounded-md text-xs flex align-center justify-center gap-xs" style={{"--h": "35px"}} disabled={loading} onClick={handleFollow}>
            <Icon name={isFollowing ? `check` : 'follow'} size={16} />
            {isFollowing ? 'Seguiendo' : 'Seguir'}
        </button>

    )

}