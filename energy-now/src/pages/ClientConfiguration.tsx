import React, { useEffect } from "react";
import InputComponent from "../components/Input";
import TabButton from "../components/Button";
import "./styles/ClientConfiguration.scss";
import { AuthContext } from "../context/AuthContext";
import MultipleSelectCheckmarks from "../components/MultipleSelectCheck";
import { SPECIALIZATIONS } from "../utils/constants/Const";

const ClientConfiguration: React.FC = () => {
    const {error} = React.useContext(AuthContext);

    const [selectedSpecialisations, setSelectedSpecialisations] = React.useState<string[]>([]);

  return <div className="client-configuration-container">
    <h1 className="client-configuration-title">CLIENT CONFIGURATION</h1>
    <p>Client Configuration Content</p>
    <div className="client-configuration-form">
        <div className="client-configuration-inputs">
            <InputComponent 
                onChange={() => {}} 
                placeholder="Icon ( In progress... )"
                label="Icon ( In progress... )"
                width={350}
                disabled
            />
            <InputComponent 
                onChange={() => {}} 
                placeholder="Type your firm name..."
                label="Firm Name"
                required
                type="text"
                width={350}
            />
            <InputComponent 
                onChange={() => {}} 
                placeholder="Type your CUI number..."
                label="CUI"
                type="number"
                width={350}
                required
            />
            <InputComponent 
                onChange={() => {}} 
                placeholder="Type your emial..."
                label="Email"
                type="email"
                width={350}
                required
            />
            <InputComponent 
                onChange={() => {}} 
                placeholder="Type your county..."
                label="County"
                type="text"
                width={350}
                required
            />
            <InputComponent 
                onChange={() => {}} 
                placeholder="Type your city..."
                label="City"
                type="text"
                width={350}
                required
            />
            <InputComponent 
                onChange={() => {}} 
                placeholder="Type your phone number..."
                label="Phone"
                type="tel"
                width={350}
                required
            />
            <InputComponent 
                onChange={() => {}} 
                placeholder="Type a description..."
                label="Description"
                type="text"
                width={350}
            />
            <MultipleSelectCheckmarks               
                width={350} 
                setSelectedItems={setSelectedSpecialisations} 
                selectedItems={selectedSpecialisations}
                label="Specializations"
                items={SPECIALIZATIONS.length > 0 ? SPECIALIZATIONS : []}
                inputLabelName="Specializations"
                required            
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