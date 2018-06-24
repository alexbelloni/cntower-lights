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
    const status = schedule.getStatusByDay(3, json);
    expect(status.occasion != '').toEqual(true);
  });   

});