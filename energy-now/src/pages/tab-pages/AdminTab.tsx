import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowModes, GridRowModesModel } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useEffect } from "react";
import { log } from "console";
import { getClients, updateClient } from "../../services/AdminService";
import { AuthContext } from "../../context/AuthContext";

interface IClients {
  id: string | number;
  firmName: string;
  cui: string;
  email: string;
  phone: string;
  isConfirmed: boolean;
  isAuthorize: boolean;
  specialization: string[];
  userId: string;
}

interface IClientUpdate {
  id: string | number;
  userId: string;
  isClientConfirmed: boolean;
  isAuthorizated: boolean;
}


const rows = [
  { 
    id: 1,
    firmName: "test", 
    cui: "134134135", 
    email: 'user1@example.com', 
    phone: '1234567890', 
    isConfirmed: true, 
    isAuthorize: false,
    specialization: ['specialization1', 'specialization2', 'specialization3']
  },
  { 
    id: 2,
    firmName: "test2", 
    cui: "2134134135", 
    email: 'user2@example.com', 
    phone: '0987654321', 
    isConfirmed: false, 
    isAuthorize: true,
    specialization: ['specialization1', 'specialization4']
  },
  // Add more rows as needed
];

const AdminTab: React.FC = () => {
  const {authData} = React.useContext(AuthContext);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const[clients, setClients] = React.useState<IClients[]>();

  useEffect(() => { 
    
    getClients(authData.token).then( async (data) => {

      console.log('Admin data: ', data);
      if(data.length > 0) {
        setClients(data);
      } else {
        console.log('Something went wrong');
      }
    });
  }, []);

  useEffect(() => {
    console.log('Clients: ', clients);
    console.log('RowModesModel: ', rowModesModel);
    
    
  }, [rowModesModel]);

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    const updatedRow = clients?.find((row) => row.id === id);
    console.log('Updated row:', updatedRow);


    // if (updatedRow) {
    //   try {
    //     const updatedRowData: IClientUpdate = {
    //       id: updatedRow.id,
    //       userId: updatedRow.userId,
    //       isClientConfirmed: updatedRow.isConfirmed,
    //       isAuthorizated: updatedRow.isAuthorize,
    //     };
    //     const result = await updateClient(authData.token, updatedRowData);
    //     console.log('updatedRowData:', updatedRowData);
        
    //     console.log('Row updated with status:', result);
    //   } catch (error) {
    //     console.error('Error updating row:', error);
    //   }
    // }

  };

  const handleDeleteClick = (id: GridRowId) => () => {
    // Handle delete action
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true } });
  };

  const columns: GridColDef[] = [
    { 
      field: 'clientName', 
      headerName: 'Firm Name', 
      width: 180, 
      editable: false, 
      type: 'string',
    },
    {
      field: 'cui',
      headerName: 'Cui',
      type: 'number',
      width: 180,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 100,
      editable: false,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 100,
      editable: false,
    },
    {
      field: 'isConfirmed',
      headerName: 'Confirmed',
      type: "boolean",
      width: 100,
      editable: true,
    },
    {
      field: 'isAuthorized',
      headerName: 'Authorized',
      type: "boolean",
      width: 100,
      editable: true,
    },
    {
      field: 'specialization',
      headerName: 'Specialization',
      type: 'singleSelect',
      width: 200,
      editable: false,
      valueOptions(params) {
        return params.row.specialization.map((spec: any) => spec);
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              sx={{ color: 'primary.main' }}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div className="admin-container">
      <h1>Admin Page</h1>
       <div style={{ height: 400, width: '80%' }}>
        <h2>Clients Table</h2>
        <DataGrid
          rows={clients}
          columns={columns}
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          // Add other necessary props here
        />
      </div>
    </div>
  );
}

export default AdminTab;