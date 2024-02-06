export interface Friend {
    anonymous_name: string;
    created_on: string;
    email: string;
    bio: string,
    user_id: string;
}

export interface SentFriendRequest {
    anonymous_name: string;
    created_on: string;
    sent_on: string;
    email: string;
    bio: string;
    friended_on: string;
    user_id: string;
}

export interface ReceivedFriendRequest {
    anonymous_name: string;
    created_on: string;
    received_on: string;
    email: string;
    bio: string;
    friended_on: string;
    user_id: string;
}

export interface User {
    anonymous_name: string;
    created_on: string; // Assuming this is a string representing a date (you may want to use Date type if working with actual Date objects)
    email: string;
    bio: string,
    own?: boolean,
    user_id: string;
}

export interface Story {
    content: string;
    created_on: string; // Assuming this is a string representing a date (you may want to use Date type if working with actual Date objects)
    story_id: number;
    title: string;
    user: User;
    reposts: number,
    favorites: number,
    reposted: boolean,
    favorited: boolean,
    user_id: string;
    topics: Topic[]
}

export const StorySchema = {
    content: "",
    created_on: "",// Assuming this is a string representing a date (you may want to use Date type if working with actual Date objects)
    story_id: 0,
    title: "",
    user: {
        anonymous_name: "",
        created_on: "", // Assuming this is a string representing a date (you may want to use Date type if working with actual Date objects)
        email: "",
        bio: "",
        user_id: "",
    },
    reposts: 0,
    favorites: 0,
    reposted: false,
    favorited: false,
    user_id: "",
    topics: []
}

export interface Topic{
    tag_id: number,
    name: string
}

export interface UserStory {
    content: string;
    created_on: string;
    favorited: boolean;
    favorites: number;
    own: boolean;
    reposted: boolean;
    reposts: number;
    story_id: number;
    title: string;
    topics: Topic[];
    user: User;
    user_id: string;
  }