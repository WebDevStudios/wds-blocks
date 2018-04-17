<?php
/**
 * Displays the Related Posts block.
 *
 * @package WDS_Gutenberg
 * @since NEXT
 */

namespace WDS\Gutenberg\blocks\related_posts;

/**
 * Render block: Related Posts.
 *
 * @param array $attributes The attributes passed in from the Related Post block settings.
 * @return string The block markup.
 *
 * @since NEXT
 */
function render_block( $attributes ) {

	ob_start(); ?>

	<!-- wp:wds/related-posts -->
	<?php \WDS\Gutenberg\template_tags\display_block_options( $attributes ); ?>

		<?php \WDS\Gutenberg\components\block_title\display_block_title( $attributes ); ?>

		<p>This is the block content. I'm adding a lot so we can see how the block lays out with background elements.</p>

		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Oratio me istius philosophi non offendit; Cupit enim dícere nihil posse ad beatam vitam deesse sapienti. Quis enim potest ea, quae probabilia videantur ei, non probare? Primum cur ista res digna odio est, nisi quod est turpis? Te enim iudicem aequum puto, modo quae dicat ille bene noris. Duo Reges: constructio interrete. </p>

		<p>Vos autem cum perspicuis dubia debeatis illustrare, dubiis perspicua conamini tollere. An quod ita callida est, ut optime possit architectari voluptates? Quid de Platone aut de Democrito loquar? Cupit enim dícere nihil posse ad beatam vitam deesse sapienti. Aperiendum est igitur, quid sit voluptas; Etenim nec iustitia nec amicitia esse omnino poterunt, nisi ipsae per se expetuntur. Recte, inquit, intellegis. Ille vero, si insipiens-quo certe, quoniam tyrannus -, numquam beatus; </p>

		<p>Traditur, inquit, ab Epicuro ratio neglegendi doloris. Ego vero volo in virtute vim esse quam maximam; Roges enim Aristonem, bonane ei videantur haec: vacuitas doloris, divitiae, valitudo; Cur deinde Metrodori liberos commendas? Qui-vere falsone, quaerere mittimus-dicitur oculis se privasse; Dici enim nihil potest verius. Sed vos squalidius, illorum vides quam niteat oratio. Cave putes quicquam esse verius. Nam Pyrrho, Aristo, Erillus iam diu abiecti. Cum id fugiunt, re eadem defendunt, quae Peripatetici, verba. </p>

		<p>Ille vero, si insipiens-quo certe, quoniam tyrannus -, numquam beatus; Quae similitudo in genere etiam humano apparet. Fatebuntur Stoici haec omnia dicta esse praeclare, neque eam causam Zenoni desciscendi fuisse. Quae est igitur causa istarum angustiarum? Coniunctio autem cum honestate vel voluptatis vel non dolendi id ipsum honestum, quod amplecti vult, id efficit turpe. Quodsi ipsam honestatem undique pertectam atque absolutam. Nos cum te, M. Primum divisit ineleganter; Si alia sentit, inquam, alia loquitur, numquam intellegam quid sentiat; Nihilne te delectat umquam -video, quicum loquar-, te igitur, Torquate, ipsum per se nihil delectat? Itaque haec cum illis est dissensio, cum Peripateticis nulla sane. Atque hoc loco similitudines eas, quibus illi uti solent, dissimillimas proferebas. </p>
	</section>
	<!-- /wp:wds/related-posts -->
	<?php

	return ob_get_clean();
}
register_block_type( 'wds/related-posts', [ 'render_callback' => __NAMESPACE__ . '\\render_block' ] );
