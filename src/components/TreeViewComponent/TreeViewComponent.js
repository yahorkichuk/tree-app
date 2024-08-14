import React, { useEffect, useState } from 'react';
import { SimpleTreeView } from "@mui/x-tree-view";
import TreeNode from "../TreeNode/TreeNode";
import TreeActionModal from "../TreeActionModal/TreeActionModal";
import { fetchTree, createNode, renameNode, deleteNode } from '../../api/treeApi';

const TreeViewComponent = () => {
    const [nodesTree, setNodesTree] = useState([]);
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [nodeName, setNodeName] = useState('');
    const [currentNode, setCurrentNode] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleOpenModal = (type, node) => {
        setModalType(type);
        setNodeName(node?.name || '');
        setCurrentNode(node);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setNodeName('');
        setErrorMessage(null);
    };

    const handleSelectNode = (nodeId) => {
        setSelectedNodeId(String(nodeId));
    };

    const handleAction = async () => {
        try {
            if (modalType === 'add') {
                await createNode(currentNode.id, nodeName);
            } else if (modalType === 'edit') {
                await renameNode(currentNode.id, nodeName);
            } else if (modalType === 'delete') {
                await deleteNode(currentNode.id);
            }

            handleCloseModal();
            await loadTree();
        } catch (error) {
            setErrorMessage(error.response.data.data.message);
        }
    };

    const loadTree = async () => {
        const treeData = await fetchTree();
        setNodesTree(treeData);
    };

    useEffect(() => {
        loadTree();
    }, []);

    return (
        <>
            <SimpleTreeView aria-label="tree">
                <TreeNode
                    node={nodesTree}
                    selectedNodeId={selectedNodeId}
                    onSelect={handleSelectNode}
                    onAdd={(node) => handleOpenModal('add', node)}
                    onEdit={(node) => handleOpenModal('edit', node)}
                    onDelete={(node) => handleOpenModal('delete', node)}
                />
            </SimpleTreeView>

            <TreeActionModal
                open={open}
                handleClose={handleCloseModal}
                handleAction={handleAction}
                modalType={modalType}
                nodeName={nodeName}
                setNodeName={setNodeName}
                errorMessage={errorMessage}
            />
        </>
    );
};

export default TreeViewComponent;
