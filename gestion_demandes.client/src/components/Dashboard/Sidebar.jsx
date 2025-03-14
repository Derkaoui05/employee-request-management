import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo  from "../../assets/logo.svg"

const navItems = [
    { name: "Tableau de bord" },
    { name: "Demandes de Conge" },
    { name: "Historique des Conges" },
    { name: "Gestion des Employes" },
    { name: "Synthese des Heures" },
    { name: "Parametrage" },
];

const dropdownOptions = {
    "Tableau de bord": [{ "name": "Mes Informations", "link": "/Information" }],
    "Demandes de Conge": [{ name: "Nouvelle Demande", link: "/demandes/nouvelle" }, { name: "Suivi des demandes", link: "/demandes/suivi" }],
    "Historique des Conges": [{ name: "Tous les Conges", link: "/historique" }, { name: "Conges par Employe", link: "/historique/employe" }],
    "Gestion des Employes": [{ name: "Liste des Employes", link: "/employes/liste" }, { name: "Ajouter un Employe", link: "/employes/ajouter" }],
    "Synthese des Heures": [{ name: "Heures de Travail", link: "/heures/travail" }, { name: "Heures supplementaires", link: "/heures/supplementaires" }],
    "Parametrage": [{ name: "Configurations", link: "/parametrage/configurations" }, { name: "Droits d'accès", link: "/parametrage/droits" }],
};

export default function Sidebar() {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    return (
        <div className="w-80 h-screen bg-[#0077B5] fixed left-0 top-0 p-6 text-white flex flex-col shadow-lg rounded-tr-[39px] transition-all ease-in-out duration-300">
            <div className="block my-4" >
                <img src={logo} className="w-full" />
            </div>
            {navItems.map((item, index) => (
                <div key={index} className="mt-10">
                    <div
                        onClick={() => toggleDropdown(index)}
                        className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-opacity-70 transition-all"
                        style={{ backgroundColor: "rgba(255, 255, 255, 12%)" }}
                    >
                        {openDropdown === index ? <ChevronUp /> : <ChevronDown />}
                        <span className="ml-3">{item.name}</span>
                    </div>
                    {openDropdown === index && (
                        <div className="pl-6 mt-2 space-y-2">
                            {dropdownOptions[item.name]?.map((option, i) => (
                                <Link
                                    key={i}
                                    to={option.link}
                                    className="flex hover:underline items-center text-gray-200 hover:text-white transition-all space-x-2 py-1"
                                >
                                    <ArrowRight size={16} />
                                    <span>{option.name}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
