package com.ouri.tree.dao;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.stereotype.Component;

@Component
@Entity
//@Scope(value="prototype")
public class Offspring {
	
	@Id
	@GeneratedValue
	private Integer id;
	private Integer coupleId;
	private Integer personId;
		
	public Offspring() {
		System.out.println("################## Offspring created "+id + ", "+this.toString());
	}

	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}


	public Integer getCoupleId() {
		return coupleId;
	}


	public void setCoupleId(Integer coupleId) {
		this.coupleId = coupleId;
	}


	public Integer getPersonId() {
		return personId;
	}


	public void setPersonId(Integer personId) {
		this.personId = personId;
	}


	@Override
	public String toString() {
		return "Offspring [id=" + id + ", coupleId=" + coupleId + ", personId=" + personId + "]";
	}


}
