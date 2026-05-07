import { invokeApi } from "@/config/invokeApi";

export const api_blogs_list = () => {
    const requestObj = {
        path: `api/blogs`,
        method: "GET"
    };
    return invokeApi(requestObj);
};

export const api_blog_detail = (id) => {
    const requestObj = {
        path: `api/blogs/${id}`,
        method: "GET"
    };
    return invokeApi(requestObj);
};

export const api_projects_list = () => {
    const requestObj = {
        path: `api/projects`,
        method: "GET"
    };
    return invokeApi(requestObj);
};

export const api_project_detail = (id) => {
    const requestObj = {
        path: `api/projects/${id}`,
        method: "GET"
    };
    return invokeApi(requestObj);
};


