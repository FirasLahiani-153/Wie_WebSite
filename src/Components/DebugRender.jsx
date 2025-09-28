import React, { useEffect, useRef } from 'react';

const DebugRender = ({ componentName, user, ...props }) => {
  const renderCount = useRef(0);
  const prevProps = useRef();
  
  renderCount.current += 1;

  useEffect(() => {
    console.log(`🔄 ${componentName} rendered #${renderCount.current}`, {
      user: user?.email || 'No user',
      props: Object.keys(props),
      propsChanged: JSON.stringify(prevProps.current) !== JSON.stringify(props)
    });
    
    prevProps.current = props;
  });

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-2 text-xs z-[9999] rounded">
      <div>{componentName}: {renderCount.current} renders</div>
      <div>User: {user?.email || 'None'}</div>
    </div>
  );
};

export default DebugRender;