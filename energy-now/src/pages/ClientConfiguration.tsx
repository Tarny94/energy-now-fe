import React from "react";
import InputComponent from "../components/Input";
import { Tab } from "@mui/material";
import TabButton from "../components/Button";
import "./styles/ClientConfiguration.scss";

const ClientConfiguration: React.FC = () => {
  return <div className="client-configuration-container">
    <h1 className="client-configuration-title">CLIENT CONFIGURATION</h1>
    <p>Client Configuration Content</p>
    <div className="client-configuration-form">
        <div className="client-configuration-inputs">
            <InputComponent 
                onChange={() => {}} 
                placeholder="Icon ( In progress... )"
                disabled
                width={350}
            />
            <InputComponent 
                onChange={() => {}} 
                placeholder="Client Name"
                required
                type="text"
                width={350}
            />
            <InputComponent 
                onChange={() => {}} 
                placeholder="CUI"
                type="number"
                width={350}
            />
            <InputComponent 
                onChange={() => {}} 
                placeholder="Email"
                type="email"
                width={350}
            />
            <InputComponent 
                onChange={() => {}} 
                placeholder="County"
                type="text"
                width={350}
            />
            <InputComponent 
                onChange={() => {}} 
                placeholder="City"
                type="text"
                width={350}
            />
            <InputComponent 
                onChange={() => {}} 
                placeholder="Phone"
                type="tel"
                width={350}
            />
            <InputComponent 
                onChange={() => {}} 
                placeholder="Specialization"
                width={350}
            />
            <InputComponent 
                onChange={() => {}} 
                placeholder="Details"
                type="text"
                width={350}
            />
        </div>
        <div className="client-configuration-buttons">
            <TabButton 
                variant="contained"  
                color="primary" 
                label="Submit"
                size="large"
                onClick={function (): void {} }
            />
            <TabButton 
                color="inherit"
                variant="contained"  
                label="Cancel"
                size="large"
                onClick={function (): void {} }
            />
        </div>
    </div>
  </div>;
};

export default ClientConfiguration;