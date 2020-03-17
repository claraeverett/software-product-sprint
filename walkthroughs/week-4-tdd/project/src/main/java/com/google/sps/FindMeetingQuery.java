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

  /* Returns a list of potential time ranges for a meeting. */ 
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    ArrayList<TimeRange> unavailableTimes = new ArrayList<TimeRange>();
    
    //If requesting too much time 
    if(request.getDuration() > TimeRange.END_OF_DAY){
        return unavailableTimes;
    }

    for(Event event: events){
        if(attendeeInEvent(unavailableTimes, event, request)){
            ArrayList<TimeRange> temp = (ArrayList)unavailableTimes.clone();
            unavailableTimes = updateAvailability(temp, event.getWhen());
        }
    }

    return availability(unavailableTimes, request);
  }

  /* Given a list of unavailable time ranges, availability() will return an array of free time ranges. */ 
  private ArrayList<TimeRange> availability(ArrayList<TimeRange> unavailable, MeetingRequest request){
    ArrayList<TimeRange> available = new ArrayList<TimeRange>();
    if(unavailable.isEmpty()){
        available.add(TimeRange.fromStartEnd(TimeRange.START_OF_DAY, TimeRange.END_OF_DAY, true));
        return available;
    }

    int currentTime = 0;
    int counter = 1;

    for(TimeRange busy: unavailable){
        if(counter == 1){
            if((!busy.overlaps(TimeRange.fromStartDuration(0,busy.start()-1))) && ((int) request.getDuration() <= busy.start()-1)){
                available.add(TimeRange.fromStartDuration(0,busy.start()));
            }
            currentTime = busy.end();
        } else {
            if(!busy.overlaps(TimeRange.fromStartDuration(currentTime, busy.start()-currentTime)) && ((int)request.getDuration()>= busy.start()-currentTime)){
                available.add(TimeRange.fromStartDuration(currentTime, busy.start()-currentTime));
                currentTime = busy.end()+1;
            }
        }
        if(counter == unavailable.size()){
            if(!busy.overlaps(TimeRange.fromStartEnd(busy.end()+1, TimeRange.END_OF_DAY, true)) && ((int)request.getDuration()<= 24*60-busy.end())){
                available.add(TimeRange.fromStartDuration(busy.end(), 24*60 - busy.end() ));
            }
        }
        counter ++;
    }
    return available;
  }

  /* Returns true if an attendee is in the specific event*/
  private boolean attendeeInEvent(ArrayList<TimeRange> unavailableTimes, Event event, MeetingRequest request){
    Collection<String> attendeeInRequest = request.getAttendees();
    for(String attendee: event.getAttendees()){
        if(attendeeInRequest.contains(attendee)){
            return true;
        }
    } 
    return false;
  }

  /* This function updateAvailability returns an updated list of unavailable times */ 
  private ArrayList<TimeRange> updateAvailability(ArrayList<TimeRange> unavailableTimes, TimeRange time){
    if(unavailableTimes.isEmpty()){
        unavailableTimes.add(time);
        return unavailableTimes;
    } else if(!conflicts(unavailableTimes, time)){
        unavailableTimes.add(time);
        return unavailableTimes;
    } else {
        return updateConflictList(unavailableTimes, time);
    }
  }

  /*This function returns true if an event conflicts with other events scheduled for the day. */
  private boolean conflicts(ArrayList<TimeRange> unavailable, TimeRange event){
    for(TimeRange listTime: unavailable){
        if(event.overlaps(listTime)){
            return true;
        }
    }
    return false;
  }

  /* This function updates the list of unavailable times. */
  private ArrayList<TimeRange> updateConflictList(ArrayList<TimeRange> unavailableTimes, TimeRange time){
    ArrayList<TimeRange> temp = (ArrayList) unavailableTimes.clone();
        for(TimeRange listTime: temp){
            if(time.contains(listTime)){
                unavailableTimes.remove(listTime);
                unavailableTimes.add(time);
            } else if(listTime.contains(time)){
                unavailableTimes.remove(time);
                if(!unavailableTimes.contains(listTime)){
                    unavailableTimes.add(listTime);
                }
                return unavailableTimes;
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
