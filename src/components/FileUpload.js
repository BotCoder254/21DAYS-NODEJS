import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/files', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setFiles(response.data);
        } catch (error) {
            console.error('Error fetching files:', error);
            setMessage({ text: 'Error fetching files', type: 'error' });
        }
    };

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage({ text: 'Please select a file first', type: 'error' });
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            setMessage({ text: 'File uploaded successfully', type: 'success' });
            setSelectedFile(null);
            fetchFiles(); // Refresh the file list
        } catch (error) {
            console.error('Upload error:', error);
            setMessage({ 
                text: error.response?.data?.message || 'Error uploading file',
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (fileId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/files/${fileId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setMessage({ text: 'File deleted successfully', type: 'success' });
            fetchFiles(); // Refresh the file list
        } catch (error) {
            console.error('Delete error:', error);
            setMessage({ text: 'Error deleting file', type: 'error' });
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Upload File</h2>
                <div className="flex gap-4 mb-4">
                    <input
                        type="file"
                        onChange={handleFileSelect}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                    />
                    <button
                        onClick={handleUpload}
                        disabled={isLoading || !selectedFile}
                        className={`px-4 py-2 rounded-md text-white ${
                            isLoading || !selectedFile 
                                ? 'bg-gray-400' 
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isLoading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
                {message.text && (
                    <div className={`p-3 rounded-md ${
                        message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                        {message.text}
                    </div>
                )}
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Your Files</h2>
                {files.length === 0 ? (
                    <p className="text-gray-500">No files uploaded yet</p>
                ) : (
                    <div className="space-y-4">
                        {files.map((file) => (
                            <div key={file._id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                                <div>
                                    <p className="font-medium">{file.originalname}</p>
                                    <p className="text-sm text-gray-500">
                                        {(file.size / 1024).toFixed(2)} KB
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(file._id)}
                                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
