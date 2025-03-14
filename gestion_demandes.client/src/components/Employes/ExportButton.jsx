import { useState } from 'react';
import { exportEmployeesToExcel } from '../../utils/export-utils';
import { useEmployeeContext } from '../../context/employe-context';

const ExportButton = () => {
    const { employees } = useEmployeeContext();
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        setIsExporting(true);

        try {
            const success = exportEmployeesToExcel(employees, `liste-employes-${new Date().toISOString().split('T')[0]}`);

            if (success) {
                // Vous pourriez ajouter une notification de succès ici
                console.log('Export réussi');
            } else {
                // Vous pourriez ajouter une notification d'erreur ici
                console.error('Échec de l\'export');
            }
        } catch (error) {
            console.error('Erreur lors de l\'export:', error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <button
            onClick={handleExport}
            disabled={isExporting || !employees.length}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${!employees.length
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
        >
            {isExporting ? (
                <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Exportation...
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Exporter en Excel
                </>
            )}
        </button>
    );
};

export default ExportButton;