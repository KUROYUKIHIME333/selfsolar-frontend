<!-- 
cablage:
    type: object
    properties:
        materiau:
            type: string
            enum:
                - cuivre
                - aluminium
            default: cuivre
            description: Matériau conducteur
        longueurString:
            type: number
            default: 15
            description: m - Câble string (champ → boîte jonction)
        longueurPrincipalDC:
            type: number
            default: 10
            description: m - Câble principal DC (boîte → onduleur)
        longueurAC:
            type: number
            default: 20
            description: m - Câble AC (onduleur → tableau)
        methodePoseDC:
            type: string
            enum:
            - conduit_encastre
            - conduit_surface
            - air_libre
            - enterre
            - gaine_technique
            default: conduit_surface
        methodePoseAC:
            type: string
            enum:
            - conduit_encastre
            - conduit_surface
            - air_libre
            - enterre
            - gaine_technique
            default: conduit_encastre
        conditionEnvironnement:
            type: string
            enum:
            - standard
            - chaud
            - tres_chaud
            - extreme
            - humide
            - corrosif
            default: chaud
            description: Conditions environnementales (impacte dé-rating) 

-->
