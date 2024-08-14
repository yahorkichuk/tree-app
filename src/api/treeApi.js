import axiosInstance from './axiosInstance';
import {TREE_NAME} from "../config";

export const fetchTree = async () => {
    try {
        const response = await axiosInstance.get(`/api.user.tree.get?treeName=${TREE_NAME}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tree:', error);
        throw error;
    }
};

export const createNode = async (parentNodeId, newNodeName) => {
    try {
        await axiosInstance.post(`/api.user.tree.node.create?treeName=${TREE_NAME}&parentNodeId=${parentNodeId}&nodeName=${newNodeName}`);
    } catch (error) {
        console.error('Error creating node:', error);
        throw error;
    }
};

export const renameNode = async (nodeId, newNodeName) => {
    try {
        await axiosInstance.post(`/api.user.tree.node.rename?treeName=${TREE_NAME}&nodeId=${nodeId}&newNodeName=${newNodeName}`);
    } catch (error) {
        console.error('Error renaming node:', error);
        throw error;
    }
};

export const deleteNode = async (nodeId) => {
    try {
        await axiosInstance.post(`/api.user.tree.node.delete?treeName=${TREE_NAME}&nodeId=${nodeId}`);
    } catch (error) {
        console.error('Error deleting node:', error);
        throw error;
    }
};
