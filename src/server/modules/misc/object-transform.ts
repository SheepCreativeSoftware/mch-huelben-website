const deepCopyObject = <ObjectType>(obj: ObjectType): ObjectType => {
	return JSON.parse(JSON.stringify(obj));
};

export { deepCopyObject };
