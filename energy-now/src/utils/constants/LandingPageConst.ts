import { GridColDef } from "@mui/x-data-grid";
import {
    randomColor,
    randomEmail,
    renderAvatar,
    renderEmail, renderRating,

} from "@mui/x-data-grid-generator";
import { Button } from '@mui/material';


export const rowsTestForDataGrid2 = [
    { id: 1, avatar: randomColor(), name: 'FanElectric', myEmail: 'electrician@gmail.com', rating: 4, electritionType: 'Instalatii Electrice', powerAuthorize: '20kw', description: 'Apasa aici', finishedTickets: 12, authorizate: true, createTicket: 'Apasa aici'},
    { id: 2, avatar: randomColor(), name: 'FanElectric', myEmail: 'electrician@gmail.com', rating: 5, electritionType: 'Instalatii Electrice', powerAuthorize: '20kw', description: 'Apasa aici', finishedTickets: 12, authorizate: true, createTicket: 'Apasa aici' },
];

export const rowsTestForDataGrid = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    avatar: randomColor(),
    name: `Firma ${index + 1}`,
    myEmail: randomEmail(),
    rating: Math.floor(Math.random() * 5) + 1,
    electritionType: 'Instalatii Electrice',
    powerAuthorize: '11kw',
    description: 'Apasa aici',
    finishedTickets: Math.floor(Math.random() * 20),
    authorizate: Math.random() > 0.5,
    createTicket: 'Apasa aici',
    city: 'Bucuresti',
    county: 'Ilfov',

}));

export const electritionFirmColumnsDataGrid: GridColDef[] = [
    {
        field: 'avatarul',
        headerName: 'Avatar',
        disableExport: true,
        display: "flex",
        filterable: false,
        sortable: false,
        renderCell: renderAvatar,
        valueGetter: (value, row) =>
            row.name == null || row.avatar == null
                ? null
                : { name: row.name, color: row.avatar },
    }as GridColDef<any, { color: string; name: string }>,
    {
        field: 'name',
        headerName: 'Firma',
        width: 150,
        editable: false,
    },
    {
        field: 'myEmail',
        headerName: 'Email',
        width: 150,
        renderCell: renderEmail,
    },
    {
        field: 'rating',
        headerName: 'Recenzie',
        display: 'flex',
        renderCell: renderRating,
        width: 180,
        type: 'number',
        availableAggregationFunctions: ['avg', 'min', 'max', 'size'],
    },
    {
        field: 'electritionType',
        headerName: 'Tipul de electrician',
        width: 150,
        editable: false,
    },
    {
        field: 'powerAuthorize',
        headerName: 'Putere Autorizata',
        width: 150,
        editable: false,
    },
    {
        field: 'description',
        headerName: 'Descriere',
        description: 'Mai multe detalii despre aceasta firma',
        sortable: false,
        width: 130,
    },
    {
        field: 'finishedTickets',
        headerName: 'Tickete terminate',
        sortable: false,
        type: 'number',
        width: 130,
    },
    {
        field: 'authorizate',
        headerName: 'Autorizat',
        type: 'boolean',
        width: 150,
    },
    {
        field: 'createTicket',
        headerName: 'Creaza un Ticket',
        width: 150,
        sortable: false,
    },
];