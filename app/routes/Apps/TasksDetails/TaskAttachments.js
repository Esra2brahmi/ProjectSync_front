import React, { useState ,useEffect,useCallback} from 'react';
import { Button, Badge } from "./../../../components";
import toast from 'react-hot-toast';


const TaskAttachments = ({ taskId, attachments, onAttachmentsUpdate }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

   // Fetch attachments only when taskId changes
  const fetchAttachments = useCallback(async () => {
    if (!taskId) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5197/api/Attachment/task/${taskId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched attachments:', data);
        onAttachmentsUpdate(data);
      }
    } catch (error) {
      console.error('Fetch error:', error); 
      toast.error('Failed to load attachments');
    } finally {
      setIsLoading(false);
    }
  }, [taskId, onAttachmentsUpdate]);

  // Initial fetch
  useEffect(() => {
    console.log('Current attachments:', attachments);
    fetchAttachments();
  }, [fetchAttachments]);


  const handleFileUpload = async () => {
    if (!selectedFiles.length) return;

    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('taskId', taskId);

        const response = await fetch('http://localhost:5197/api/Attachment', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error(`Failed to upload ${file.name}`);
        return await response.json();
      });

      const newAttachments = await Promise.all(uploadPromises);
      onAttachmentsUpdate([...(attachments || []), ...newAttachments]);
      setSelectedFiles([]);
      toast.success('Files uploaded successfully!');
    } catch (error) {
      toast.error(`Upload failed: ${error.message}`);
    }
  };

  const handleDownload = async (attachmentId, fileName) => {
    try {
      const response = await fetch(`http://localhost:5197/api/Attachment/download/${attachmentId}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      toast.error('Failed to download file');
    }
  };

  const handleDelete = async (attachmentId) => {
         const userConfirmed = await new Promise((resolve) => {
    toast.custom((t) => (
      <div style={{
        background: 'white',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        maxWidth: '300px'
      }}>
        <p style={{ marginBottom: '12px' }}>Are you sure you want to delete this file?</p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => {
              resolve(true);
              toast.dismiss(t.id);
            }}
            style={{
              padding: '6px 12px',
              background: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              resolve(false);
              toast.dismiss(t.id);
            }}
            style={{
              padding: '6px 12px',
              background: '#e0e0e0',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  });

  if (!userConfirmed) return;
    
    try {
      const response = await fetch(`http://localhost:5197/api/Attachment/${attachmentId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        onAttachmentsUpdate(attachments.filter(a => a.id !== attachmentId));
        toast.success('File deleted successfully');
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      toast.error('Failed to delete file');
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const validTypes = [
        'image/jpeg', 'image/png', 'application/pdf',
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      const maxSize = 100 * 1024 * 1024; // 100MB
      
      if (!validTypes.includes(file.type)) {
        toast.error(`Unsupported file type: ${file.name}`);
        return false;
      }
      if (file.size > maxSize) {
        toast.error(`File too large (max 100MB): ${file.name}`);
        return false;
      }
      return true;
    });
    setSelectedFiles(validFiles);
  };

  const AttachmentItem = ({ attachment }) => {
    const fileIcon = getFileIcon(attachment.fileName);
    const fileColor = getFileColor(attachment.fileName);
    
    return (
      <div className="d-flex align-items-center mb-3">
        <div className={`mr-3 ${fileColor}`}>
          <i className={`fa fa-${fileIcon} text-white`}></i>
        </div>
        <div className="flex-grow-1">
          <div>{attachment.fileName}</div>
          <small className="text-muted">{`${Math.round(attachment.fileSize / 1024)} KB`}</small>
        </div>
        <Button color="link" onClick={() => handleDownload(attachment.id, attachment.fileName)}>
          <i className="fa fa-download"></i>
        </Button>
        <Button color="link" onClick={() => handleDelete(attachment.id)}>
          <i className="fa fa-trash text-danger"></i>
        </Button>
      </div>
      
    );
  };

  const getFileIcon = (fileName) => {
    const ext = fileName?.split('.').pop().toLowerCase();
    if (['doc', 'docx'].includes(ext)) return 'file-word-o';
    if (['xls', 'xlsx'].includes(ext)) return 'file-excel-o';
    if (['ppt', 'pptx'].includes(ext)) return 'file-powerpoint-o';
    if (['pdf'].includes(ext)) return 'file-pdf-o';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'file-image-o';
    return 'file-o';
  };

  const getFileColor = (fileName) => {
    const ext = fileName?.split('.').pop().toLowerCase();
    if (['doc', 'docx'].includes(ext)) return 'text-primary';
    if (['xls', 'xlsx'].includes(ext)) return 'text-success';
    if (['ppt', 'pptx'].includes(ext)) return 'text-warning';
    if (['pdf'].includes(ext)) return 'text-danger';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'text-info';
    return 'text-secondary';
  };

  return (
    <div className="mb-4">
      <div className="mb-3">
        <span className="small mr-3">Attachments</span>
        <Badge pill color="secondary">
          {attachments?.length || 0}
        </Badge>
      </div>
      
      {attachments?.map((attachment) => (
        <AttachmentItem key={attachment.id} attachment={attachment} />
      ))}
      
      <div className="mb-5">
        <input
          type="file"
          id={`file-upload-${taskId}`}
          multiple
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
          style={{ display: 'none' }}
        />
        <label htmlFor={`file-upload-${taskId}`} className="btn btn-link">
          <i className="fa fa-plus mr-2"></i>
          Add More Files
        </label>
        
        {selectedFiles.length > 0 && (
          <div className="mt-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="small text-muted">
                {file.name} ({Math.round(file.size / 1024)} KB)
              </div>
            ))}
            <Button 
              color="primary" 
              size="sm" 
              className="mt-2"
              onClick={handleFileUpload}
            >
              Upload Files
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskAttachments;