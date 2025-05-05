import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { 
    Container,
    Row,
    Table,
    CardFooter,
    Card,
    Col
} from './../../../components';


import { HeaderMain } from "../../components/HeaderMain";
import { ProjectsSmHeader } from "../../components/Projects/ProjectsSmHeader";
import { Paginations } from "../../components/Paginations";

import { TrTableGalleryList } from "./components/TrTableGalleryList";

const GalleryTable = () => {
    const location = useLocation();
    const [departmentId, setDepartmentId] = useState(null);
    const [level, setLevel] = useState(null);
    const [title, setTitle] = useState('Gallery Table');
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch reports by project level
    const fetchReportsByLevel = async (level) => {
        if (!level) return;
        
        setLoading(true);
        setError(null);
        
        try {
            const response = await axios.get(`http://localhost:5197/api/Reports/level/${level}`);
            setReports(response.data);
            console.log(`Fetched ${response.data.length} reports for level ${level}`);
        } catch (err) {
            console.error('Error fetching reports:', err);
            setError('Failed to load reports. Please try again later.');
            setReports([]);
        } finally {
            setLoading(false);
        }
    };

    // Extract query parameters
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const deptId = searchParams.get('departmentId');
        const projLevel = searchParams.get('level');
        
        setDepartmentId(deptId);
        setLevel(projLevel);
        
        if (deptId && projLevel) {
            setTitle(`${projLevel} Reports`);
            fetchReportsByLevel(projLevel);
        }
    }, [location.search]);

    return (
        <React.Fragment>
            <Container>
                <HeaderMain 
                    title={title}
                    className="mb-5 mt-4"
                />
                { /* START Content */}
                <Row>
                    <Col lg={ 12 }>
                        <ProjectsSmHeader 
                            subTitle={level ? `${level} Reports` : "Reports Gallery"}
                            linkList="/apps/gallery-table"
                            linkGrid="/apps/gallery-grid"
                        />
                        <Card>
                            { /* START Table */}
                            <Table className="mb-0" hover size="sm" responsive>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Thumb</th>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Date</th>
                                        <th>Info</th>
                                        <th className="text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="7" className="text-center py-4">
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <i className="fa fa-spinner fa-spin fa-2x"></i>
                                                </div>
                                                <div className="mt-2">Loading reports...</div>
                                            </td>
                                        </tr>
                                    ) : error ? (
                                        <tr>
                                            <td colSpan="7" className="text-center text-danger py-4">
                                                <i className="fa fa-exclamation-triangle mr-2"></i>
                                                {error}
                                            </td>
                                        </tr>
                                    ) : reports.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center py-4">
                                                No reports found for {level} projects.
                                            </td>
                                        </tr>
                                    ) : (
                                        reports.map((report, index) => (
                                            <TrTableGalleryList 
                                                key={report.id || index}
                                                id={report.id || (index + 1).toString()}
                                                report={report}
                                                departmentId={departmentId}
                                                level={level}
                                            />
                                        ))
                                    )}
                                </tbody>
                            </Table>
                            { /* END Table */}
                            <CardFooter className="d-flex justify-content-center pb-0">
                                <Paginations />    
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                { /* END Content */}
            </Container>
        </React.Fragment>
    );
};

export default GalleryTable;