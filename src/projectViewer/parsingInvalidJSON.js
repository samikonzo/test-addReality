var l = console.log

/**
* 
*/

function findModulesAndProject(str){
	var regExp_module_project = /(?:(?:modules).*?:(.*]).*?)?(?:(?:project).*?:(.*?}))/im
	var matches = str.match(regExp_module_project)
	var modules = matches[1]
	var project = matches[2]
	var screens = []

	if(modules){
		try {
			modules = JSON.parse(modules)
			
		} catch(e) {
			l("CANT PARSE MODULE")
			
			// modify modules by hand parser
			let handedParsePrepare = findArrayAndObject(modules)

			try {
				l(handedParsePrepare)
				modules = JSON.parse(handedParsePrepare)
			} catch(e) {
				l('OH NO, STILL CANT PARSE MODULE')
			}
		}

		modules.forEach(module => {
			if(module.screens) screens.push(module.screens)
		})
	}

	if(project){
		try{
			project = JSON.parse(project)

		} catch(e){
			l("CANT PARSE PROJECT")
			let handedParsePrepare = findArrayAndObject(project)

			try{
				project = JSON.parse(handedParsePrepare)
			} catch(e){
				l('OH NO, STILL CANT PARSE PROJECT')
			}
		}
	}

	//l({modules, screens, project})
	return {modules, screens, project}
}

function findArrayAndObject(str){
	var startEndLvlSymbol = '-'
	var groupOpen = 'open'
	var groupClose = 'close'
	var objectLvl = 1
	var objectLvlSymbol = '!'
	var arrayLvl = 1
	var arrayLvlSymbol = '_'
	
 
 	// modificate string : replace [] {} with -_1open- etc
	str = str.split('')
	 
	for(var i = 0; i < str.length; i++){
		if(str[i] === '['){
			str[i] = startEndLvlSymbol + arrayLvlSymbol + arrayLvl + groupOpen + startEndLvlSymbol
			arrayLvl++
		}
		
		if(str[i] === ']'){
			arrayLvl--
			str[i] = startEndLvlSymbol + arrayLvlSymbol + arrayLvl + groupClose + startEndLvlSymbol
		}
		
		if(str[i] === '{'){
			str[i] = startEndLvlSymbol + objectLvlSymbol + objectLvl + groupOpen + startEndLvlSymbol
			objectLvl++
		}
		
		if(str[i] === '}'){
			objectLvl--
			str[i] =  str[i] = startEndLvlSymbol + objectLvlSymbol + objectLvl + groupClose + startEndLvlSymbol
		}
	}
	
	str = str.join('')


	return getStructureRecursive(str)
	
	function getStructureRecursive(str, parentType, lvl){
		var tempValue = 'A_'
		var regExp = new RegExp(`${startEndLvlSymbol}([${arrayLvlSymbol}|${objectLvlSymbol}])(\\d+)${groupOpen}${startEndLvlSymbol}(.*?)${startEndLvlSymbol}\\1\\2${groupClose}${startEndLvlSymbol}`)
		var regExpGlobal = new RegExp(`${startEndLvlSymbol}([${arrayLvlSymbol}|${objectLvlSymbol}])(\\d+)${groupOpen}${startEndLvlSymbol}(.*?)${startEndLvlSymbol}\\1\\2${groupClose}${startEndLvlSymbol}`, 'g')
		
		//l(str)
		
		// find all matches
		var matchesGlobal = str.match(regExpGlobal)
		
		
		
	 	// if no matches => return current string
		if(!matchesGlobal){
			str = normalizeString(str)

			// add separator {} or []
			if(parentType === 'object'){
				str = `{${str}}`
			} else if(parentType === 'array'){
				str = `[${str}]`
			}

			return str
		}
		
		// replace original match to tempValue_num (just for edit other props)
		matchesGlobal.forEach((strWithMatch, i) => {
			//l('strWithMatch')
			//l(strWithMatch)
			str = str.replace(strWithMatch, tempValue + i)
		})

		//l(parentType)
		//l(str)
		

		// normalise string : 
		str = normalizeString(str)

		
		matchesGlobal.forEach((strWithMatch, i) => {
			var matches = strWithMatch.match(regExp)
			var type = matches[1] === objectLvlSymbol ? 'object' : 'array'
			var inside = matches[3]

		 	// look inside [] {}
			if(inside){
				inside = getStructureRecursive(inside, type)
			} 

			// replace back tempValue_num with inside
			str = str.replace(tempValue+i, inside)
		})


		// add separator {} or []
		if(parentType === 'object'){
			str = `{${str}}`
		} else if(parentType === 'array'){
			str = `[${str}]`
		}

		return str


		function normalizeString(str){
			// trim and add/remove " if needed 

			str = str.split(',').map(item => {
				return item.split(':').map(param => {
					param = param.trim()
					param.replace("'", '"')

					// add " if param string
					if(param[0] === '"' && param[param.length - 1] !== '"') param = param + '"'

					//l(param)
					return param
				}).join(':')
			}).join(',')
			
			return str
		}
	}
}

export default findModulesAndProject