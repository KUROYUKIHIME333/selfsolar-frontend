<!-- 
 contraintesOnduleur:
  type: object
  description: Caractéristiques onduleur candidat (vérification)
  properties:
    puissanceACNominale:
      type: number
      description: W - Puissance sortie AC nominale
    tensionDCMax:
      type: number
      description: V - Limite ABSOLUE sécurité
    tensionMPPTMin:
      type: number
      description: V - Minimum pour fonctionnement MPPT
    tensionMPPTMax:
      type: number
      description: V - Maximum plage MPPT
    courantDCMax:
      type: number
      description: A - Courant entrée DC max
    puissanceDCMax:
      type: number
      description: W - Puissance entrée max
    puissanceSurcharge:
      type: number
      description: W - Pic soutenable (démarrage moteurs)
    rendementMPPT:
      type: number
      description: Rendement MPPT (0.96-0.99)
    tensionBatterieMin:
      type: number
      description: V - Pour hybride
    tensionBatterieMax:
      type: number
      description: V - Pour hybride
    puissanceChargeBatterieMax:
      type: number
      description: W - Pour hybride 
-->
