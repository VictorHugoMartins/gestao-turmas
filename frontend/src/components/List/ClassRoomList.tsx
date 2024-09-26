import React, { useState } from "react";
import { useClassroom } from "../../contexts/ClassroomContext";
import {
    Tabs,
    Tab,
    Box,
    Typography
} from "@mui/material";
import { useStatistics } from "../../contexts/StatisticsContext";
import StudentViewList from "./StudentViewList";
import ClassroomMenuModal from "../ModalForm/ClassroomMenuModal";

interface ClassroomListProps { }

const ClassroomList: React.FC<ClassroomListProps> = () => {
    const { classrooms } = useClassroom();
    const { values } = useStatistics();
    const [activeTab, setActiveTab] = useState<number>(0);
    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <div className="container classroom-list-container">
            <Typography variant="h4" gutterBottom className="classroom-list-title">
                Turmas
            </Typography>

            <p>
                Abaixo você pode ver todos os seus alunos. Na <strong>primeira aba</strong>, você consegue ver todos os seus alunos e suas médias gerais dentro de <strong>todas as turmas</strong>. Nesta aba, você também pode <strong>editar os dados pessoas</strong> desses alunos. Nas demais abas, você pode ver <strong>as notas dos alunos por turma</strong>. Estão destacadas em <strong style={{ color: "#43d669" }}> verde</strong> aquelas notas <strong style={{ color: "#43d669" }}> maiores que a média da turma</strong> (ou cuja <strong>média de todas as notas</strong> é <strong>maior que a média de todas as turmas</strong>) e em <strong style={{ color: "orange" }}>laranja</strong> as <strong style={{ color: "orange" }}>frequências menores que 75%</strong>.
            </p>

            <Tabs
                value={activeTab}
                onChange={handleChangeTab}
                aria-label="tabs de classrooms"
                className="classroom-list-tabs"
            >
                {classrooms.map((classroom) => (
                    <Tab
                        key={classroom.id}
                        label={
                            <Box className="classroom-list-tab">
                                {classroom.name}
                                <ClassroomMenuModal classroom={classroom} />
                            </Box>
                        }
                    />
                ))}
            </Tabs>

            {activeTab >= 0 && activeTab < classrooms.length && (
                <Box className="classroom-list-student-list">
                    <StudentViewList classroomId={classrooms[activeTab]?.id ?? -1} mediaGeral={values.mediaClassroomGrades} />
                </Box>
            )}
        </div>
    );
};

export default ClassroomList;
