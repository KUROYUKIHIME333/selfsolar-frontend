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

<script lang="ts">
	let {
		visibility = true
	}: {
		visibility?: boolean;
	} = $props();
</script>

<fieldset class="form-section {visibility ? '' : 'is-hidden-now'}">
	<legend class="section-legend">
		<h2>Caractéristiques onduleur candidat</h2>
	</legend>

	<div class="section-content">
		<div class="section-datas-style">
			<span
				>Si vous avez déjà une idée sur l'onduleur à utiliser, ou un candidat, ou juste un sous la main.</span
			>
      <span
				>C'est juste pour vérifier qu'il fera bien l'affaire.</span
			>
		</div>
	</div>
</fieldset>
