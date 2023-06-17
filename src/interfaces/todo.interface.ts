export interface Todo {
    _id?: string;
    title:  string;
    content:  string;
    date:  string;
    priority:  string;
    user_id:  string | null;
    status: string;
    setTodos?: any;
}