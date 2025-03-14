


export const fetchEmployes = async () => {
    const response = await fetch('/api/Employes');
    return response.json();
};

export const getEmployeById = async (matricule) => {
    const response = await fetch(`/api/Employes/${matricule}`);
    return response.json();
};

export const addEmploye = async (employe) => {
    const response = await fetch('/api/Employes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employe)
    });
    return response.json();
};

export const updateEmploye = async (employe) => {
    const response = await fetch(`/api/Employes/${employe.matricule}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employe)
    });
    return response.json();
};

export const deleteEmploye = async (matricule) => {
    const response = await fetch(`/api/Employes/${matricule}`, {
        method: 'DELETE'
    });
    return response.json();
};

export const fetchDepartements = async () => {
    const response = await fetch('/api/Departement');
    return response.json();
};
export const fetchRoles = async () => {
    const response = await fetch('/api/Role');
    return response.json();
};