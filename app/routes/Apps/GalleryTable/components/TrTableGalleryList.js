import React, { useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import PropTypes from "prop-types";
import { format } from 'date-fns';
import axios from 'axios';
import toast from 'react-hot-toast';

import {
  Badge,
  CustomInput,
  Avatar,
  HolderProvider,
  CardImg,
  Media,
  AvatarAddOn,
  Button,
  UncontrolledTooltip,
} from "./../../../../components";

import { randomArray, randomAvatar } from "./../../../../utilities";

const status = ["secondary", "danger", "success", "warning"];
const badges = ["secondary"];

const TrTableGalleryList = ({ id, report: initialReport, level }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [report, setReport] = useState(initialReport);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // Format date if it exists and is valid
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'dd-MMM-yyyy');
    } catch (error) {
      return dateString;
    }
  };
  
  // Format file size to readable format
  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    const kb = bytes / 1024;
    if (kb < 1024) {
      return `${Math.round(kb)} KB`;
    } else {
      return `${(kb / 1024).toFixed(2)} MB`;
    }
  };
  
  // Handle file upload button click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  
  // Handle file selection
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed');
      event.target.value = '';
      return;
    }
    
    setUploading(true);
    setUploadSuccess(false);
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      
      // Use the correct API endpoint with the report ID
      const reportId = report.id;
      const response = await axios.post(`http://localhost:5197/api/Reports/${reportId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update the report state with the new data
      setReport(response.data);
      setUploadSuccess(true);
      
      toast.success('Report uploaded successfully!');
      console.log('Upload successful:', response.data);
      
      // Reset the file input
      event.target.value = '';
    } catch (error) {
      console.error('Error uploading file:', error);
      
      // Show more specific error message if available
      const errorMessage = error.response?.data || 'Failed to upload report. Please try again.';
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  // If there's no report data, show placeholder content
  if (!report) {
    return (
      <React.Fragment>
        <tr>
          <td className="align-middle">
            <CustomInput
              type="checkbox"
              id={`trTableGalleryList-${id}`}
              label=""
              inline
            />
          </td>
          <td className="align-middle">
            <HolderProvider.Icon iconChar="" size={16} width={100} height={100}>
              <CardImg className="rounded" />
            </HolderProvider.Icon>
          </td>
          <td className="align-middle">
            <span>
              <a className="text-inverse" href="#">
                {faker.commerce.productName()}
              </a>
              <br />
              <span href="#">{faker.system.fileName()}</span>
              <br />
              <Badge pill color={randomArray(badges)} className="mr-1">
                {faker.commerce.department()}
              </Badge>
            </span>
          </td>
          <td className="align-middle">
            <Media>
              <Media left className="align-self-center mr-3">
                <Avatar.Image
                  size="md"
                  src={randomAvatar()}
                  addOns={[
                    <AvatarAddOn.Icon
                      className="fa fa-circle"
                      color="white"
                      key="avatar-icon-bg"
                    />,
                    <AvatarAddOn.Icon
                      className="fa fa-circle"
                      color={randomArray(status)}
                      key="avatar-icon-fg"
                    />,
                  ]}
                />
              </Media>
              <Media body>
                <a className="mt-0 text-decoration-none d-flex" href="#">
                  {faker.person.firstName()} {faker.person.lastName()}
                </a>
                <span>
                  {faker.location.state()}, {faker.location.stateAbbr()}
                </span>
              </Media>
            </Media>
          </td>
          <td className="align-middle">22-Jul-2012</td>
          <td className="align-middle">
            Size: {faker.number.int()} Kb
            <br />
            Format: .png
          </td>
          <td className="align-middle text-right">
            <Button color="link" id={`trTableGalleryListTooltip-${id}`}>
              <i className="fa fa-fw fa-download"></i>
            </Button>
            <UncontrolledTooltip
              placement="left"
              target={`trTableGalleryListTooltip-${id}`}
            >
              Download
            </UncontrolledTooltip>
          </td>
        </tr>
      </React.Fragment>
    );
  }

  // Get thumbnail icon based on file type
  const getFileIcon = (fileType) => {
    const type = fileType?.toLowerCase() || '';
    if (type.includes('pdf')) return 'fa-file-pdf-o';
    if (type.includes('doc') || type.includes('word')) return 'fa-file-word-o';
    if (type.includes('xls') || type.includes('excel')) return 'fa-file-excel-o';
    if (type.includes('ppt') || type.includes('powerpoint')) return 'fa-file-powerpoint-o';
    if (type.includes('zip') || type.includes('rar')) return 'fa-file-archive-o';
    if (type.includes('jpg') || type.includes('jpeg') || type.includes('png') || type.includes('gif')) return 'fa-file-image-o';
    return 'fa-file-o';
  };

  return (
    <React.Fragment>
      <tr className={uploadSuccess ? "bg-light-success" : ""}>
        <td className="align-middle">
          <CustomInput
            type="checkbox"
            id={`trTableGalleryList-${id}`}
            label=""
            inline
          />
        </td>
        <td className="align-middle">
          <div className="d-flex justify-content-center align-items-center" style={{ width: 100, height: 100 }}>
            <i className={`fa ${getFileIcon(report.fileFormat)} fa-3x text-muted`}></i>
          </div>
        </td>
        <td className="align-middle">
          <span>
            <a className="text-inverse" href="#">
              {report.projectName || 'Untitled Report'}
            </a>
            <br />
            <span>Deadline: {formatDate(report.deadline)}</span>
            <br />
            {report.fileName && (
              <span className={uploadSuccess ? "text-success font-weight-bold" : ""}>
                File: {report.fileName}
                {uploadSuccess && <i className="fa fa-check-circle ml-1 text-success"></i>}
              </span>
            )}
            <br />
            <Badge pill color="primary" className="mr-1">
              {level || 'N/A'}
            </Badge>
            {report.tags?.map((tag, index) => (
              <Badge key={index} pill color={randomArray(badges)} className="mr-1">
                {tag}
              </Badge>
            ))}
            {!report.tags && (
              <Badge pill color={randomArray(badges)} className="mr-1">
                {report.projectName || report.project?.name || 'Report'}
              </Badge>
            )}
          </span>
        </td>
        <td className="align-middle">
          <Media>
            <Media left className="align-self-center mr-3">
              <Avatar.Image
                size="md"
                src={report.authorAvatar || randomAvatar()}
                addOns={[
                  <AvatarAddOn.Icon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddOn.Icon
                    className="fa fa-circle"
                    color="success"
                    key="avatar-icon-fg"
                  />,
                ]}
              />
            </Media>
            <Media body>
              <a className="mt-0 text-decoration-none d-flex" href="#">
                {report.juryMemberName || report.authorName || report.author || 'Unknown Author'}
              </a>
              <span>
                {report.authorEmail || 'No email provided'}
              </span>
            </Media>
          </Media>
        </td>
        <td className="align-middle">
          <div>Deadline: {formatDate(report.deadline)}</div>
          {report.uploadDate && (
            <div className={uploadSuccess ? "text-success" : ""}>
              Uploaded: {formatDate(report.uploadDate)}
              {uploadSuccess && <span className="ml-1">✓</span>}
            </div>
          )}
        </td>
        <td className="align-middle">
          Status: {report.status || 'N/A'}
          <br />
          {report.fileSize ? (
            <div className={uploadSuccess ? "text-success" : ""}>
              Size: {formatFileSize(report.fileSize)}
            </div>
          ) : null}
          <div>Format: {report.fileFormat || 'N/A'}</div>
        </td>
        <td className="align-middle text-right">
          {/* Hidden file input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleFileChange}
            accept="application/pdf,.pdf"
          />
          
          {/* Upload button */}
          <Button 
            color="link" 
            className="mr-1" 
            id={`trTableGalleryListUploadTooltip-${id}`}
            onClick={handleUploadClick}
            disabled={uploading}
          >
            <i className={`fa fa-fw ${uploading ? 'fa-spinner fa-spin' : 'fa-upload'}`}></i>
          </Button>
          <UncontrolledTooltip
            placement="left"
            target={`trTableGalleryListUploadTooltip-${id}`}
          >
            Upload PDF Report
          </UncontrolledTooltip>
          
          {/* Download button */}
          <Button 
            color="link" 
            id={`trTableGalleryListTooltip-${id}`}
            disabled={!report.fileName}
          >
            <i className="fa fa-fw fa-download"></i>
          </Button>
          <UncontrolledTooltip
            placement="left"
            target={`trTableGalleryListTooltip-${id}`}
          >
            {report.fileName ? 'Download Report' : 'No file available'}
          </UncontrolledTooltip>
        </td>
      </tr>
    </React.Fragment>
  );
};

TrTableGalleryList.propTypes = {
  id: PropTypes.node,
  report: PropTypes.object,
  level: PropTypes.string,
};

TrTableGalleryList.defaultProps = {
  id: "1",
};

export { TrTableGalleryList };
