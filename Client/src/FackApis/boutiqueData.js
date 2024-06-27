import leftbaner from "../assets/imagesboutique/left-banner-image.jpg"
import banerRight1 from "../assets/imagesboutique/baner-right-image-01.jpg"
import banerRight2 from "../assets/imagesboutique/baner-right-image-02.jpg"
import banerRight3 from "../assets/imagesboutique/baner-right-image-03.jpg"
import banerRight4 from "../assets/imagesboutique/baner-right-image-04.jpg"
import logo from "../assets/imagesboutique/logo.png"

import men1 from "../assets/imagesboutique/men-01.jpg"
import men2 from "../assets/imagesboutique/men-02.jpg"
import men3 from "../assets/imagesboutique/men-03.jpg"


const boutiqueData = { 
    "infoEntreprise" : {
        "nom": "Hexashop",
        "logo": logo,
        "image": leftbaner,
        "description": "Awesome, clean & creative HTML5 Template",
        "contacts": {
            "telephone": "098765432",
            "email": "mycompany@info.com",
            "adress": "24 Av Ville Pays",
            "siteweb": "www.mycompany.com",
            "facebook": "@mycompany",
            "instagram": "@mycompany"
        }
    },
    "collections" : [
        {
            "id": "1",
            "nom": "Men",
            "image": banerRight1,
            "description":"Best Clothes For men",
            "details":"Details to details is what makes Hexashop different from the other themes.",
            "produits": [
                {
                    "id": "1",
                    "nom": "Classic Spring",
                    "image": men1,
                    "prix": "102.00",
                    "devise": "USD",
                    "impressions": []
                },
                {
                    "id": "2",
                    "nom": "Classic Spring",
                    "image": men2,
                    "prix": "102.00",
                    "devise": "USD",
                    "impressions": []
                },
                {
                    "id": "3",
                    "nom": "Classic Spring",
                    "image": men3,
                    "prix": "102.00",
                    "devise": "USD",
                    "impressions": []
                },
                {
                    "id": "4",
                    "nom": "Classic Spring",
                    "image": men1,
                    "prix": "102.00",
                    "devise": "USD",
                    "impressions": []
                },
                {
                    "id": "5",
                    "nom": "Classic Spring",
                    "image": men2,
                    "prix": "102.00",
                    "devise": "USD",
                    "impressions": []
                },
                {
                    "id": "6",
                    "nom": "Classic Spring",
                    "image": men3,
                    "prix": "102.00",
                    "devise": "USD",
                    "impressions": []
                }
            ]

        },
        {
            "id": "2",
            "nom": "Women",
            "image": banerRight2,
            "description":"Best Clothes For women",
            "details":"Details to details is what makes Hexashop different from the other themes.",
            "produits": [
                {
                    "id": "1",
                    "nom": "Classic Spring",
                    "prix": "102.00",
                    "devise": "USD",
                    "impressions": []
                }
            ]

        },
        {
            "id": "3",
            "nom": "Kids",
            "image": banerRight3,
            "description":"Best Clothes For Kids",
            "details":"Details to details is what makes Hexashop different from the other themes.",
            "produits": [
                {
                    "id": "1",
                    "nom": "Classic Spring",
                    "prix": "102.00",
                    "devise": "USD",
                    "impressions": []
                }
            ]

        },
        {
            "id": "4",
            "nom": "Accessories",
            "image": banerRight4,
            "description":"Best Trend Accessories",
            "details":"Details to details is what makes Hexashop different from the other themes.",
            "produits": [
                {
                    "id": "1",
                    "nom": "Classic Spring",
                    "prix": "102.00",
                    "devise": "USD",
                    "impressions": []
                }
            ]

        }

    ],
}

export default boutiqueData