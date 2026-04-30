<!-- 
autonomieBatterie:
    type: number
    minimum: 0.5
    maximum: 10
    description: Jours d'autonomie souhaités

technologieBatterie:
    type: string
    enum:
        - Plomb-acide
        - AGM/Gel
        - LiFePO4
        - Lithium NMC/NCA
        - NiCd
    default: LiFePO4

tensionSystemeBatterie:
    type: number
    enum:
        - 12
        - 24
        - 48
    description: V - Pour systèmes off-grid basse tensi -->

<script></script>

<fieldset class="form-section {visibility ? '' : 'is-hidden-now'}">
	<legend class="section-legend">
		<h2>Inventaire des équipements électriques</h2>
	</legend>

    <div class="section-content"></div>

<fieldset/>
