import * as XLSX from 'xlsx';


export const exportEmployeesToExcel = (employees, fileName = 'employees') => {
    try {
        if (!employees || employees.length === 0) {
            console.alert('Aucune donnée à exporter');
            return false;
        }

        const formattedData = employees.map(employee => ({
            "Matricule": employee.matricule,
            "Nom": employee.nom,
            "Prenom": employee.prenom,
            "Email": employee.email,
            "Date Embauche": formatDate(employee.dateEmbauche),
            "Role": employee.nomRole || "",
            "Departement": employee.nomDepartement || ""
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);

        const columnWidths = [
            { wch: 10 }, // Matricule
            { wch: 15 }, // Nom
            { wch: 15 }, // Prénom
            { wch: 25 }, // Email
            { wch: 15 }, // Date d'Embauche
            { wch: 20 }, // Rôle
            { wch: 20 }, // Département
        ];
        worksheet['!cols'] = columnWidths;

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Employes');

        XLSX.writeFile(workbook, `${fileName}.xlsx`);

        return true;
    } catch (error) {
        console.error('Erreur lors de l\'export Excel:', error);
        return false;
    }
};


const formatDate = (dateString) => {
    if (!dateString) return '';

    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    } catch (error) {
        return dateString;
    }
};