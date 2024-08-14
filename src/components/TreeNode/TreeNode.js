import React from 'react';
import {TreeItem} from "@mui/x-tree-view";
import {Box, IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {TREE_NAME} from "../../config";

const TreeNode = ({node, selectedNodeId, onSelect, onAdd, onEdit, onDelete}) => {
    const isNotRootNode = node.name !== TREE_NAME;

    return (
        <TreeItem
            itemId={String(node.id)}
            label={
                <Box display="flex" alignItems="center" sx={{minHeight: '38px'}} onClick={() => onSelect(node.id)}>
                    <span>{node.name}</span>
                    {selectedNodeId === String(node.id) && (
                        <Box ml={1}>
                            <IconButton
                                aria-label="add"
                                color="primary"
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAdd(node);
                                }}
                            >
                                <AddIcon fontSize="small"/>
                            </IconButton>

                            {isNotRootNode && (
                                <>
                                    <IconButton
                                        aria-label="edit"
                                        color="primary"
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEdit(node);
                                        }}
                                    >
                                        <EditIcon fontSize="small"/>
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        color="error"
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(node);
                                        }}
                                    >
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                </>
                            )}
                        </Box>
                    )}
                </Box>
            }
        >
            {
                Array.isArray(node.children) && node.children.map((childNode) => (
                    <TreeNode
                        key={childNode.id}
                        node={childNode}
                        selectedNodeId={selectedNodeId}
                        onSelect={onSelect}
                        onAdd={onAdd}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))
            }
        </TreeItem>
    )
};

export default TreeNode;
