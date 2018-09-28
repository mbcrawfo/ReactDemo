import { flow, upperFirst, camelCase } from 'lodash';
import { isPlainObject, mapKeys, mapValues } from 'lodash/fp';

export const pascalCase = flow(camelCase, upperFirst);

// ripped from stack overflow
export const deepMapKeys = (keyMapper: (key: string) => string) => (obj: any): any =>
{
    const mapper = deepMapKeys(keyMapper);

    if (Array.isArray(obj))
    {
        return obj.map(mapper);
    }
    if (isPlainObject(obj))
    {
        return (mapValues(mapper) as any)(mapKeys(keyMapper)(obj));
    }
    return obj;
};

export const mapKeysToCamelCase = deepMapKeys(camelCase);

export const mapKeysToPascalCase = deepMapKeys(pascalCase);
