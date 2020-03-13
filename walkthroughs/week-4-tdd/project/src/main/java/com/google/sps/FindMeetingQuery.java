// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.Collection;
import java.util.ArrayList;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    ArrayList<TimeRange> unavailableTimes = new ArrayList<TimeRange>();

    for(Event event: events){
        if(attendeeInEvent(unavailableTimes, event, request)){
            unavailableTimes = updateAvailability(unavailableTimes, event.getWhen());
        }
    }
    //Find available times now !!
    return availability(unavailableTimes, request);
  }

  private ArrayList<TimeRange> availability(ArrayList<TimeRange> unavailable, MeetingRequest request){
      ArrayList<TimeRange> available = new ArrayList<TimeRange>();
      for(int i = TimeRange.START_OF_DAY; i < TimeRange.END_OF_DAY; i++){
          for(TimeRange badTime: unavailable){
              if(!badTime.overlaps(TimeRange.fromStartDuration(i, (int) request.getDuration()))){
                  available.add(TimeRange.fromStartDuration(i, (int) request.getDuration()));
              }
          }
      }
      return available;
  }

  private boolean attendeeInEvent(ArrayList<TimeRange> unavailableTimes, Event event, MeetingRequest request){
      Collection<String> attendeeInRequest = request.getAttendees();
      for(String attendee: event.getAttendees()){
          if(attendeeInRequest.contains(attendee)){
              unavailableTimes = updateAvailability(unavailableTimes, event.getWhen());
          }
      } 
      return false;
  }

  private ArrayList<TimeRange> updateAvailability(ArrayList<TimeRange> unavailableTimes, TimeRange time){
      if(unavailableTimes.isEmpty()){
          unavailableTimes.add(time);
          return unavailableTimes;
      } else if(!conflicts(unavailableTimes, time)){
          unavailableTimes.add(time);
          return unavailableTimes;
      } else {
          ArrayList<TimeRange> temp = unavailableTimes;
          for(TimeRange listTime: temp){
              if(time.contains(listTime)){
                  unavailableTimes.remove(listTime);
                  unavailableTimes.add(time);
              } else if(time.overlaps(listTime)){
                  int start;
                  int end;
                  if(time.start() <= listTime.start()){
                      start = time.start();
                  } else{
                      start = listTime.start();
                  }

                  if(time.end() >= listTime.end()){
                      end = time.end();
                  } else {
                      end = listTime.end();
                  }

                  unavailableTimes.remove(time);
                  unavailableTimes.remove(listTime);
                  unavailableTimes.add(TimeRange.fromStartDuration(start,end-start));
              }
          }
        return unavailableTimes;
      }
  }

  private boolean conflicts(ArrayList<TimeRange> unavailable, TimeRange event){
      for(TimeRange listTime: unavailable){
          if(event.overlaps(listTime)){
              return true;
          }
      }
      return false;
  }
}
