import Image from 'next/image';

const Characters = ({ characters }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {characters?.map(character => (
        <div key={character.id} className="flex flex-col">
          <Image
            src={character.image}
            alt={character.name}
            width={300}
            height={300}
          />
          <div>
            <h3 className="text-lg font-semibold mb-1">{character.name}</h3>
            <p className="text-sm text-gray-700 mb-1">
              Origin: {character.origin.name}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              Location: {character.location.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Characters;
