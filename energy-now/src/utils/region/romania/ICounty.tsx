export interface County {
    auto: string;
    nume: string;
    localitati: City[];
}

export interface City {
    nume: string;
    comuna: string;
}