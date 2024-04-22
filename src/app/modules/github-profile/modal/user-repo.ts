export interface UserRepo {
    public_repos : number,
    login : string
    followers : number
    followers_url : string
    following : number
    location : string
    name : string
    twitter_username: string
    bio : string
    html_url : string

}

export interface  RepoDetails {
    "html_url": string
    "description": string
    "topics" : Array<string>
    "name" :string
    "stargazers_count":number
    "language":string
}

export interface tabTypes {
    "text":string
    "value": null | number
}

export interface  startRepoDetails {
    "html_url": string
    "description": string
    "topics" : Array<string>
    "name" :string
    "stargazers_count":number
    "language":string
    "owner" : {
        avatar_url :string
    }
}