<!-- 
pompageSolaire:
    type: boolean
    description: Application pompage d'eau
    
pompageCaracteristiques:
    type: object
    properties:
        batteries:
            type: boolean
        masseVolumique:
            type: number
            default: 1000
            description: "kg/m³ - Eau: 1000"
        accelerationPesanteur:
            type: number
            default: 9.81
            description: "m/s² - Standard: 9.81"
        debit:
            type: number
            description: m³/j - Débit journalier requis
        hauteurMano:
            type: number
            description: m - Hauteur manométrique totale
        rendementPompe:
            type: number
            minimum: 0.4
            maximum: 0.7
            description: η pompe (0.4-0.7)


            
        required:
        - batteries
        - debit
        - hauteurMano
        - rendementPompe 
      
-->
