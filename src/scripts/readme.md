# Introduction
Nous utilisons une architecture JavaScript custom afin de fluidifier, de normaliser et de modulariser les interactions de surface et autres développement le nécessitant.
Basé sur les derniers standards du langage (ES6), elle fait office de boîte à outils et de base de code sur nos différents projets.
Non pas le meilleur framework du marché ou le plus complet, il est  léger, rapide, et aussi bien déployable sur des plates-formes demandant de grandes performances de rendu (type sites expérientiels) que sur des sites beaucoup plus large. En soit, il est conçu pour correspondre au mieux à nos besoins.

Prérequis : 

 - Bases en programmation orienté objet
 - Bases en ES6

# Utilisation
L’utilisation de l’architecture se compose de 3 parties principales : **les components**, **les utils** et **le core**. Chacune de ces parties va jouer un rôle spécifique afin de permettre de créer un environnement logique modulaire et évolutif.

## Les components
Le système de component est inspiré par les différentes normes actuelles propres aux framework faisant office de référence en la matière : reactJS, vueJS, PolymereJS, …
Les components sont généralement rattachés à un tag du DOM pointé via une classe. Il est conseillé de la nommé de la manière suivante: `js-class-name-in-kebabcase`.

Leur structure de base est la suivante :

```javascript
import Component from '../colorz/Component';

module.exports = class Test extends Component {

	onInit( el, args ) {
		this.el 		= el;
		this.data 		= args;
		this.isActive 	= true;
	}

	onReady() {
		console.log( 'ready' );
	}

	onUpdate( delta ) {
		console.log( 'update', delta );
	}

	onActivate() {
		console.log( 'onActivate' );
	}

	onDesactivate() {
		console.log( 'onDesactivate' );
	}

	onResize() {
		console.log( 'onResize' );
	}

	onScroll() {
		console.log( 'onScroll' );
	}
}
```

### Lifecycle
Chaque component hérite d’un certain nombre de méthode dont il hérite.
Ces méthodes son bindé à son contexte, et prête à être utilisées.

 - **onInit( args )** Appelé à l’initialisation du component. Remplace le
   constructeur de la classe
 - **onReady()** Appelé à l’event *ready* du *window*
 - **isReady** Propriété booléenne conditionnant la méthode *onUpdate*
 - **onUpdate( delta )** Appelé au *requestAnimationFrame*. Conditionné par
   *this.isActive*
   *delta* est in flottant indiquant en milliseconde la durée écoulée depuis son dernier appel
 - **onActivate()** Appelé lorsque la propriété *this.isActive* passe de *false*
   à *true*
 - **onDesactivate()** Appelé lorsque la propriété *this.isActive* passe de
   *true* à *false*
 - **onResize()** Appelé lorsque au l’event *resize* du *window*
 - **onScroll()** Appelé à l’event *scroll* du *window*
 - **onDestroy()** A appeler lors de la destruction du component

### Méthodes custom
L’utilisation de méthodes custom se fait de la même manière que pour toutes classe ES6.
Il faut cependant ne pas utiliser des noms propres au méthode du lifecycle
Il est recommandé de préfixé les méthodes d’event par on.

```javascript
import Component 	from '../colorz/Component';
import device 		from '../colorz/utils/device';

module.exports = class JohnDoe extends Component{
	onInit( el, args ) {
		this.onPointerdown = this.onPointerdown.bind( this );

		this.el = el;
	}

	onReady() {
		this.el.addEventListener( device.pointerdown, this.onPointerdown );
		this.el.addEventListener( device.pointerup, () => {
			console.log('coucou');
		});
	}

	onPointerdown( event ) {
		console.log('coucou');
	}
}
```

## Les Utils
Les utils forment vraiment la partie boite à outils de l’architecture. Ce sont des helpers utilisables dans n’importe quel component afin d’aider au bon fonctionnement de cette dernière.

 - **Easing** Librairie d’easing JavaScript permettant le passage d’une valeur à une autre sur une durée prédéfinie.

```javascript
import Component 	from '../colorz/Component';
import Easing 		from '../colorz/utils/Easing';

module.exports = class JohnDoe extends Component{
	onReady() {
		this.easing = new Easing({
			type: 		'easeInOutQuart',
			duration: 	1000,
			start: 		0,
			end: 		1,
			callback:   () => {
				this.easing = null;
			}
		});

		this.easing.isActive = true;
	}

	onUpdate() {
		if( this.easing !== null )
			console.log( this.easing.value );
	}
}
```

 - **Emitter** Gestionnaire d’événements inter-components via la librairie emitter.

```javascript
import Component 	from '../colorz/Component';
import emitter 		from '../colorz/utils/Emitter';

module.exports = class JohnDoe extends Component{
	onInit() {
		emitter.on( 'test', ( message ) => {
			console.log( message );
		} );
	}

	onReady() {
		setTimeout( ()=>{
			emitter.emit( 'test', 'coucou' );
		}, 500)
	}
}
```

 - **Vector2** Classe de vecteurs adapté de la classe Vector2 de threeJS
 - **Vector3** Classe de vecteurs adapté de la classe Vector3 de threeJS
 - **Vector4** Classe de vecteurs adapté de la classe Vector4 de threeJS
 - **Clamp** Fonction permettant de limiter une valeur entre un minima et un maxima
 - **Creator** Outils d’aide à la création de component propres à l’architecture. La classe instancié recevra automatiquement à l'initialisation en tent qu'argument son élément et les datas

```javascript
 creator( '.js-image-cover-wrapper', ImageCoverWrapper, { banana: 'potatoe' } );
```

 - **Device** Singleton contenant un grands nombre d’informations sur le device client utilisé et contenant des événements cross-device
 - **getAbsoluteOffset** Function permettant la récupération de l’offset d’un élément en fonction de la page
 - **getRelativeOffset** Function permettant la récupération de l’offset d’un élément en fonction de son parent
 - **Konami** Fonction qui lance un événement dès la détection d’un konami code
 - **Mapper** Fonction permettant d’interpoler une variable sur d’une échelle linéaire à l’autre
 - **stylizer** Méthodes permettant d’appliquer des styles CSS préfixés
 - **AJAX** module de gestion de requêtes asynchrones
 - **ActiveOnReady** Component permettant de shooter une classe "is-active" au ready du document
 - **FixScroll** Singleton permettant d'activer ou désactiver le scroll d'un page à la volée
 - **debounce** Outils permettant de debounce un callback

```javascript
 window.addEventListener( device.pointerdown, debounce( ()=>{
     console.log('banana');
 }), 200)
```

 - **throttle** Outils permettant de throttle un callback
 - **webglAvailable** Fonction testant la compatibilité webGL du navigateur


Chaque utils est commenté afin de savoir quels arguments ils attendent.

## Les cores
Les cores sont des components propres à l’architecture et parfaitement réutilisables.

 - **Popin** Gestionnaire de popin

```javascript
	new PopinManager();
```
```html
	<a href="#" class="js-popin-open"  data-popin="popin-exemple">Open Popin</a>
	
	<div class="popin-wrapper js-popin" style="display: none;" id="popin-exemple">
	
		<div class="popin-background js-popin-bg"></div>
		<div class="popin">
			<div class="popin-close js-popin-close"></div>
			<!-- Popin content -->
	   	</div>
    </div>
```

 - **ImageCover** Simule la taille *background-size : cover* sur n’importe quel élément DOM

```javascript
	creator( '.js-image-cover-wrapper', ImageCoverWrapper );
```
```html
	<div class="js-image-cover-wrapper">
	    <img class="js-image-cover" src="mypicture-800x500.jpg" data-width="800" data-height="400">
	</div>
```

 - **Expandable** Créer un comportement d'item accordéon

```javascript
    creator( '.js-expendable', Expandable );
```
```html
    <div class="js-expendable">
        <div class="js-expendable-btn">
            Title
        </div>
        <div class="js-expendable-wrapper" style="display:none">
            Content
        </div>
    </div>
```

 - **VideoPlayer** Créer un player natif avec cover

```javascript
    creator( '.js-video-player', VideoPlayer )
```
```html
	<div>
		<video src="https://www.lanvin.com/wp-content/uploads/2018/01/femme-1.mp4" class="js-video-player" id="video"></video>
		<img src="https://vyrez.com/wp-content/uploads/2012/12/unicorn-wallpaper.jpg" id="cover-video">
		<div id="icon-video"></div>
	</div>
```

 - **YoutubePlayer** Créer un player natif avec cover

```javascript
    creator( '.js-youtube-player', YoutubePlayer )
```
```html
	<div>
		<video data-id="GGhKPm18E48" data-controls="0" class="js-youtube-player" id="youtube-video"></video>
		<img src="https://vyrez.com/wp-content/uploads/2012/12/unicorn-wallpaper.jpg" id="cover-youtube-video">
		<div id="icon-youtube-video" style="background-color: black;"></div>
	</div>
```


## La hiérarchie de components
L’architecture repose sur une gestion des components orienté objet semblable à celle utilisé par reactJS, vueJS, ou encore polymere. La principale différence est que ces framework utilisent un rendu asynchrone afin de gérer le binding unidirectionnel et bidirectionnel avec le DOM.

Les mêmes préceptes peuvent donc s’appliquer. Pour résumer, il y a une hiérarchie forte entre les components reposant sur un principe de transmission de l’information descendant. Un component parent connais ses enfants, mais pas inversement. Par extension, un component parent manage ses enfants, tandis que ses enfants se contente de remonter leur changement d’états si besoin.

![alt text](https://012.vuejs.org/images/components.png "hiérarchie components")

# What’s in the box
L’architecture repose principalement sur l’utilisation de l’ES6 et sa simplification de la gestion des classe qu’il offre. L’ES6 n’est qu’un sucre syntaxique permettant une manipulation plus aisée de ces dernières.

## Lifecycle
La partie la plus important de l'architecture, permettant de controler le lifecycle des composants est dans *./colorz/lifecycle*.
Basé sur la notion de singleton, l'idée est d'avoir un unique point d'entré par événements et de le transmettre aux components le nécessitant.

**BaseLifeCycle.js** est une classe abstraite faisant office de gestionnaire d'événements. Ils possède des méthodes pour stocker les éléments nécessitants d'être appelé, et les désactiver si besoin.

**OnReady.js**, **OnResize.js** et **OnScroll.js** vont respectivement gérer les events du window ready, resize et scroll. Ces classes hérites de BaseLifeCycle.js pour toutes notions de gestionnaire. Ces singletons transmettre les événements aux différents components de l'application s'ils en ont l'utilité.
**OnUpdate.js** va fonctionner de la même manière afin d'appeler au requestAnimationFrame les fonctions le nécessitant.

**Component.js** le classe abstraite dont hérite les components de l'architecture. Dedans est gérer le register au différents événements et la transmission de datas si besoin.

## Core et utils
Ces éléments de l'architecture doivent être au maximum commentés afin d'assurer leur bonne maintenabilité.

## Prochaines features
 - Synchronisation de variables inter-components via un binding de props
 	- Mise en place de *watchers* typés
 - Ajouter onDetached
 	- Vérifier l'unbinding aux différents register du lifecycle
 - rattacher webglAvailable au device
 - Ajouter un core asynch basé sur barba.js