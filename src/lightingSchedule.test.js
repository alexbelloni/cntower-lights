import React from 'react';
import TowerInfo from './lightingSchedule';

it('getSchedule', () => {
    const schedule = new TowerInfo();
    schedule.getSchedule(function(json){
      expect(json.dates.length > 0).toEqual(true);
    });    
});

it('getStatusByDay', () => {
  const schedule = new TowerInfo();
  schedule.getSchedule(function(json){
    const configs = schedule.getConfigsByDay(3, json);
    expect(configs.length > 0).toEqual(true);
  });   

});